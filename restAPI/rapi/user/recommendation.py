import numpy as np
import pandas as pd

from sklearn.model_selection import cross_validate

from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, mean_squared_error, mean_absolute_error
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
from sklearn import model_selection

import warnings
warnings.filterwarnings("ignore")

pd.set_option('display.max_rows', 1000)


def generateRecommendations():
    df = pd.read_csv('E:/5th semester/SplTwo/BiddersDen-master/restAPI/rapi/user/biddata.csv')
    df


    df['user_score'] = df['event_type'].map({'view':1,'bid':10})
    df['user_bid'] = df['event_type'].apply(lambda x: 1 if x=='bid' else 0)
    df['price_category'] = 0
    #for i in df['category_code'].unique():
    #    df.loc[df['category_code']==i,'price_category'] = pd.qcut(x=df['price'][df['category_code']==i],q=5, duplicates = 'drop')
    df

    df.to_csv('initialdf1.csv')

    df['price_category'] = pd.qcut(x=df['price'] ,q=5,labels=[1,2,3,4,5])
    df

    group = df.groupby(['user_id','product_id'])['user_score','user_bid'].sum().reset_index()
    group['user_bid'] = group['user_bid'].apply(lambda x: 1 if x>1 else x)
    group['user_score'] = group['user_score'].apply(lambda x: 100 if x>100 else x)
    group

    std = MinMaxScaler(feature_range=(0.025, 1))
    std.fit(group['user_score'].values.reshape(-1,1))
    group['interaction_score'] = std.transform(group['user_score'].values.reshape(-1,1))

    group = group.merge(df[['product_id','category_code','price','price_category']].drop_duplicates('product_id'),on=['product_id'])
    group

    X_train_val, X_test = model_selection.train_test_split(group,test_size=0.2, random_state=42)

    X_train, X_valid = model_selection.train_test_split(X_train_val,test_size=0.16, random_state=42)

    X_valid1 = X_valid.copy()
    X_valid2 = X_valid.copy()
    X_train_val1 = X_train_val.copy()

    product_cat = X_train[['product_id','price_category','category_code']].drop_duplicates('product_id')
    product_cat = product_cat.sort_values(by='product_id')
    product_cat

    product_cat_matrix = np.reciprocal(euclidean_distances(np.array(product_cat['price_category']).reshape(-1,1))+1)
    product_cat_matrix

    euclidean_matrix = pd.DataFrame(product_cat_matrix,columns=product_cat['product_id'],index=product_cat['product_id'])
    euclidean_matrix

    tfidf_vectorizer = TfidfVectorizer()
    doc_term = tfidf_vectorizer.fit_transform(list(product_cat['category_code']))
    dt_matrix = pd.DataFrame(doc_term.toarray().round(3), index=[i for i in product_cat['product_id']], columns=tfidf_vectorizer.get_feature_names())
    dt_matrix

    cos_similar_matrix = pd.DataFrame(cosine_similarity(dt_matrix.values),columns=product_cat['product_id'],index=product_cat['product_id'])
    cos_similar_matrix

    similar_matrix = cos_similar_matrix.multiply(euclidean_matrix)

    X_train_matrix = pd.pivot_table(X_train,values='user_score',index='user_id',columns='product_id')
    X_train_matrix = X_train_matrix.fillna(0)
    X_train_matrix

    content_matrix = X_train_matrix.dot(similar_matrix)
    std = MinMaxScaler(feature_range=(0, 1))
    std.fit(content_matrix.values)
    content_matrix = std.transform(content_matrix.values)
    content_matrix

    content_matrix = pd.DataFrame(content_matrix,columns=sorted(X_train['product_id'].unique()),index=sorted(X_train['user_id'].unique()))
    content_df = content_matrix.stack().reset_index()
    content_df = content_df.rename(columns={'level_0':'user_id','level_1':'product_id',0:'predicted_interaction'})
    content_df


    X_valid = X_valid.sort_values('user_id')
    X_valid

    X_valid = pd.merge(X_valid, content_df,  how='left', left_on=['user_id','product_id'], right_on = ['user_id','product_id'])
    X_valid

    X_valid['predicted_purchase'] = X_valid['predicted_interaction'].apply(lambda x:1 if x>=0.5 else 0)
    X_valid

    item_price_precision = precision_score(X_valid['user_bid'],X_valid['predicted_purchase'])
    item_price_precision

    item_price_recall = recall_score(X_valid['user_bid'],X_valid['predicted_purchase'])
    item_price_recall

    item_price_f1 = f1_score(X_valid['user_bid'],X_valid['predicted_purchase'])
    item_price_f1

    content_matrix = X_train_matrix.dot(cos_similar_matrix)
    std = MinMaxScaler(feature_range=(0, 1))
    std.fit(content_matrix.values)
    content_matrix = std.transform(content_matrix.values)
    content_matrix = pd.DataFrame(content_matrix,columns=sorted(X_train['product_id'].unique()),index=sorted(X_train['user_id'].unique()))
    content_df = content_matrix.stack().reset_index()
    content_df = content_df.rename(columns={'level_0':'user_id','level_1':'product_id',0:'predicted_interaction'})
    X_valid2 = X_valid2.merge(content_df,on=['user_id','product_id'])

    X_valid2['predicted_purchase'] = X_valid2['predicted_interaction'].apply(lambda x:1 if x>=0.5 else 0)
    X_valid2

    X_test.sort_values(by='interaction_score',ascending=False).head(1000)

    users = df['user_id'].unique()
    """user = 'bsse1102'
    sampleuser_trainval = X_train_val[X_train_val['user_id']==user]
    #sampleuser_trainval.to_csv('sampleuser_trainval.csv')
    print(sampleuser_trainval)
    
    sampleuser_test = X_test[X_test['user_id']==user]
    #sampleuser_test.to_csv('sampleuser_test.csv')
    print(sampleuser_test)
    
    sample = content_df[content_df['user_id']==user].sort_values(by='predicted_interaction',ascending=False).merge(group[['product_id','category_code','price','price_category']].drop_duplicates('product_id'),on='product_id')
    print(sample)
    
    sampleuser_recommend = sample[sample['predicted_interaction']>=0.5].sample(3,random_state=0)
    #sampleuser_recommend.to_csv('sampleuser_recommend.csv')
    print(sampleuser_recommend)"""
    for user in users:
        sampleuser_trainval = X_train_val[X_train_val['user_id']==user]
        #sampleuser_trainval.to_csv('sampleuser_trainval.csv')
        #print(sampleuser_trainval)

        sampleuser_test = X_test[X_test['user_id']==user]
        #sampleuser_test.to_csv('sampleuser_test.csv')
        #print(sampleuser_test)

        sample = content_df[content_df['user_id']==user].sort_values(by='predicted_interaction',ascending=False).merge(group[['product_id','category_code','price','price_category']].drop_duplicates('product_id'),on='product_id')
        #print(sample)

        sampleuser_recommend = sample[sample['predicted_interaction']>=0.5].sample(3,random_state=0)
        file_name = 'recommendations_' + user + '.csv'
        sampleuser_recommend.to_csv('E:/' + file_name)

generateRecommendations()