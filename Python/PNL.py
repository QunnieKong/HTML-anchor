# plug-n-learn代码
# Rokni S A, Ghasemzadeh H. Plug-n-learn: automatic learning of computational algorithms 
# in human-centered internet-of-things applications[C]// Design Automation Conference. ACM, 2016:139.

import numpy as np
import pandas as pd
from sklearn import neighbors
from sklearn.model_selection import ShuffleSplit
from sklearn.metrics import precision_recall_curve
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.cluster import KMeans
from munkres import Munkres, print_matrix

# 获取数据
data = pd.read_csv('data.csv')
labels = data['activity']
classes = list(labels.drop_duplicates())
classNum = classes.__len__()
features = data.drop('activity', axis=1)

# 划分训练集和测试集
data_train, data_test, label_train, label_test = train_test_split(features, labels, test_size=0.35, random_state=50)
source_train = data_train.iloc[:, :18]
source_test = data_test.iloc[:, :18]
target_train = data_train.iloc[:, 18:24]
target_test = data_test.iloc[:, 18:24]

# 训练KNN分类器
clf = neighbors.KNeighborsClassifier()
clf.fit(source_train, label_train)

#测试结果
def get_accuracy(data_true, data_predict, l):
    hitnum = 0
    j=-1
    for i in data_true.index:
        j = j+1
        if data_true[i] == data_predict[j]:
            hitnum = hitnum + 1
    return hitnum/l

source_predict = clf.predict(source_test)
test_len  = label_test.__len__()
source_cluster_accuracy = get_accuracy(label_test, source_predict, test_len)
print("source数据KNN预测正确率", source_cluster_accuracy)

# 获得混淆矩阵
cm = confusion_matrix(label_test, source_predict, classes)
print("混淆矩阵：\n", cm)

# 生成semi-label
def get_semi_label(cm, classes, clnum):
    semi_label = []
    for i in range(0,clnum):
        label = []
        for j in range(0,clnum):
            label.append(0)
            if cm[i][j]!=0:
                label[j]=1
        semi_label.append(label)
    return semi_label

# 生成new-semi-label
def get_new_semi_label(cm, classes, clnum):
    semi_label = []
    for i in range(0, clnum):
        label = []
        for j in range(0, clnum):
            label.append(0)
            if cm[i][j]>=500:
                label[j]=1
        semi_label.append(label)
    return semi_label

semi_label = get_semi_label(cm, classes, classes.__len__())

# 获取有semilabel的targetData
def get_semi_data(semi_label, data, classes, clnum):
    newTData = []
    for i in data.index:
        for j in range(0, clnum):
            if data[i] == classes[j]:
                break
        newTData.append(semi_label[j])
    newTData = pd.DataFrame(newTData, columns=['sl1', 'sl2', 'sl3', 'sl4', 'sl5', 'sl6', 'sl7', 'sl8', 'sl9', 'sl10',
                                               'sl11', 'sl12', 'sl13', 'sl14', 'sl15', 'sl16', 'sl17'])
    return newTData
target_train = target_train.reset_index().drop(['index'],axis=1)
frames = [get_semi_data(semi_label, label_train, classes, classes.__len__()), target_train]
target_train = pd.concat(frames, axis=1)

# KMeans聚类
target_cluster = KMeans(n_clusters=17).fit(target_train)
target_predict = target_cluster.labels_
train_len = target_train.shape[0]


def get_predict(inds, classes, len):
    pre = []
    for i in range(0,len):
        pre.append(classes[inds[i]])
    pd.DataFrame(pre, columns=['activity'])
    return pre

target_predict = get_predict(target_predict, classes, train_len)
source_predict = clf.predict(source_train)

# 创建WLG
wlg = [[0 for col in range(classNum)] for row in range(classNum)]
for i in range(0, train_len):
    ci = target_predict[i]
    ai = source_predict[i]
    cInd = classes.index(ci)
    aInd = classes.index(ai)
    slt = semi_label[aInd]
    if slt[cInd] != 1:
       wlg[cInd][aInd] = wlg[cInd][aInd] - 1

# 匈牙利算法
munk = Munkres()
indexes = munk.compute(wlg)
result = []
for i in range(0, train_len):
    ci = target_predict[i]
    cInd = classes.index(ci)
    result.append(classes[indexes[cInd][1]])
final_accuracy = get_accuracy(label_train, result, train_len)
print("最终结果正确率：", final_accuracy)

