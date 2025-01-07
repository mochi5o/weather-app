## 天気予報アプリ

### 概要

- 地域を選択すると、天気がわかるサービス
- 取得した天気情報はDBに格納して、同じ日の同一地域の天気情報はDBから取得する

### URL

http://mochi5o.com

使い方: 地図上で任意の場所を選択して現在の天気を確認します。

### DB構成

サーバー上での確認内容
```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| weather_app        |
+--------------------+
5 rows in set (0.00 sec)

mysql> use weather_app;
Database changed
mysql> show tables;
+-----------------------+
| Tables_in_weather_app |
+-----------------------+
| weathers              |
+-----------------------+
1 row in set (0.00 sec)

mysql> desc weathers;
+-------------+--------------+------+-----+-------------------+-----------------------------+
| Field       | Type         | Null | Key | Default           | Extra                       |
+-------------+--------------+------+-----+-------------------+-----------------------------+
| id          | bigint(20)   | NO   | PRI | NULL              | auto_increment              |
| name        | varchar(255) | YES  |     | NULL              |                             |
| timestamp   | varchar(255) | YES  |     | NULL              |                             |
| icon        | varchar(100) | YES  |     | NULL              |                             |
| description | mediumtext   | YES  |     | NULL              |                             |
| temperature | varchar(255) | YES  |     | NULL              |                             |
| latitude    | varchar(255) | YES  |     | NULL              |                             |
| longitude   | varchar(255) | YES  |     | NULL              |                             |
| created_at  | timestamp    | NO   |     | CURRENT_TIMESTAMP |                             |
| updated_at  | timestamp    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+-----------------------------+
10 rows in set (0.02 sec)

mysql>
```

## 自分の中で工夫した点・チャレンジした点

- Dockerを使って環境を構築したこと
- AWSへデプロイして動作するインフラ環境を整備したこと
- シンプルな機能ではあるが、docker-compose環境を活用してフロントとAPIをシンプルに分けて実装したこと
- 軽量なフレームワークであるExpressを使ってAPIサーバを構築したこと
- 代表地点を使った検索と地図上でポインタを指定する使いやすさを両立させたこと
- API呼び出し回数を制限するためのデータ設計
  - 緯度経度の一致を条件にして同一データかどうかを判定した
