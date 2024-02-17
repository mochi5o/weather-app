## 天気予報アプリ

### 概要

- 地域を選択すると、天気がわかるサービス
- 取得した天気情報はDBに格納して、同じ日の同一地域の天気情報はDBから取得する
- 提出物：ソースコード、DB構成、動作するURL
- 目的：インターネットに公開して、旅行に行く人が、現地の天気を確認する目的で利用します

### URL

http://mochi5o.com

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
