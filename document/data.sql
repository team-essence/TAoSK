SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE IF EXISTS allocations;
DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS invitations;
DROP TABLE IF EXISTS list_sorts;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS monsters;
DROP TABLE IF EXISTS qualification;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS occupations;
DROP TABLE IF EXISTS species;




/* Create Tables */

-- タスク割り当てテーブル
CREATE TABLE allocations
(
	id int unsigned COMMENT 'id',
	user_id varchar(255) NOT NULL COMMENT 'ユーザID : uid使用想定し、Stringで取れるvarchar',
	task_id int unsigned NOT NULL COMMENT 'タスクID',
	created_at timestamp COMMENT '作成日',
	deleted_at datetime COMMENT '削除日'
) COMMENT = 'タスク割り当てテーブル';


-- チャットテーブル
CREATE TABLE chats
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	comment varchar(255) NOT NULL COMMENT 'コメント内容',
	created_at timestamp COMMENT '作成日',
	updated_at timestamp COMMENT '更新日',
	deleted_at datetime COMMENT '削除日',
	task_id int unsigned NOT NULL COMMENT 'タスクID',
	PRIMARY KEY (id)
) COMMENT = 'チャットテーブル';


-- 企業テーブル
CREATE TABLE companies
(
	uid varchar(255) NOT NULL COMMENT 'uid',
	name varchar(50) NOT NULL COMMENT '企業名',
	PRIMARY KEY (uid)
) COMMENT = '企業テーブル';


-- グループテーブル
CREATE TABLE groups
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	user_id varchar(255) NOT NULL COMMENT 'ユーザID : uid使用想定し、Stringで取れるvarchar',
	project_id int unsigned NOT NULL COMMENT 'プロジェクトID',
	authority_flg boolean COMMENT '権限フラグ',
	created_at timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
	deleted_at datetime COMMENT '削除日',
	PRIMARY KEY (id)
) COMMENT = 'グループテーブル';


-- 興味テーブル
CREATE TABLE interests
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	context varchar(255) COMMENT '内容 : 興味あること',
	user_id varchar(255) NOT NULL COMMENT 'ユーザID : uid使用想定し、Stringで取れるvarchar',
	PRIMARY KEY (id)
) COMMENT = '興味テーブル';


-- 招待テーブル
CREATE TABLE invitations
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	user_id varchar(255) NOT NULL COMMENT 'ユーザID : uid使用想定し、Stringで取れるvarchar',
	project_id int unsigned NOT NULL COMMENT 'プロジェクトID',
	created_at timestamp COMMENT '作成日',
	deleted_at datetime COMMENT '削除日 : 招待済み・キャンセルされた場合に入る
',
	PRIMARY KEY (id)
) COMMENT = '招待テーブル';


-- リストテーブル
CREATE TABLE lists
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	list_id int(11) unsigned COMMENT 'リストID',
	name varchar(255) COMMENT 'リスト名',
	project_id int unsigned NOT NULL COMMENT 'プロジェクトID',
	PRIMARY KEY (id)
) COMMENT = 'リストテーブル';


-- リスト順序テーブル
CREATE TABLE list_sorts
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	task_list int(11) COMMENT 'タスク順序',
	list_id int unsigned NOT NULL COMMENT 'リストID',
	PRIMARY KEY (id)
) COMMENT = 'リスト順序テーブル';


-- ログテーブル
CREATE TABLE logs
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	context varchar(255) NOT NULL COMMENT '内容',
	created_at timestamp COMMENT '作成日',
	user_id varchar(255) NOT NULL COMMENT 'ユーザID : uid使用想定し、Stringで取れるvarchar',
	project_id int unsigned NOT NULL COMMENT 'プロジェクトID',
	PRIMARY KEY (id)
) COMMENT = 'ログテーブル';


-- モンスターテーブル
CREATE TABLE monsters
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(50) NOT NULL COMMENT 'モンスター名',
	type int(10) NOT NULL COMMENT 'タイプ : 10段階',
	story varchar(255) COMMENT 'ストーリー・特徴 : ストーリー・特徴の説明',
	species_id int unsigned NOT NULL COMMENT '種族ID',
	PRIMARY KEY (id)
) COMMENT = 'モンスターテーブル';


-- 職種テーブル
CREATE TABLE occupations
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(255) COMMENT '職種名 : 職種カテゴリー(例：エンジニア・デザイナー)',
	PRIMARY KEY (id)
) COMMENT = '職種テーブル';


-- プロジェクトテーブル
CREATE TABLE projects
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(255) NOT NULL COMMENT 'プロジェクト名',
	overview varchar(255) COMMENT '概要',
	monster_id int unsigned NOT NULL COMMENT 'モンスターid',
	hp int(11) COMMENT 'モンスターHP : タスクパラメータから算出',
	difficulty int(11) NOT NULL COMMENT '難易度 : 星の数',
	end_date datetime NOT NULL COMMENT '期日',
	project_end_flg boolean COMMENT 'プロジェクト終了フラグ',
	created_at timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
	deleted_at datetime COMMENT '削除日',
	PRIMARY KEY (id)
) COMMENT = 'プロジェクトテーブル';


-- 資格テーブル
CREATE TABLE qualification
(
	id int unsigned COMMENT 'id',
	name varchar(255) COMMENT '資格名',
	user_id varchar(255) NOT NULL COMMENT 'ユーザID : uid使用想定し、Stringで取れるvarchar'
) COMMENT = '資格テーブル';


-- 種族テーブル
CREATE TABLE species
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(50) NOT NULL COMMENT '種族名',
	PRIMARY KEY (id)
) COMMENT = '種族テーブル';


-- タスクテーブル
CREATE TABLE tasks
(
	id int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	project_id int unsigned NOT NULL COMMENT 'プロジェクトID',
	overview varchar(255) COMMENT '概要',
	explanation varchar(255) COMMENT '説明',
	technology int(11) DEFAULT 0 NOT NULL COMMENT '技術力',
	achievement int(11) DEFAULT 0 NOT NULL COMMENT '達成力',
	solution int(11) DEFAULT 0 NOT NULL COMMENT '問題発見・解決力',
	motivation int(11) DEFAULT 0 NOT NULL COMMENT '意欲 : やる気',
	plan int(11) DEFAULT 0 NOT NULL COMMENT '設計力',
	design int(11) DEFAULT 0 NOT NULL COMMENT 'デザイン力',
	weight int(11) unsigned NOT NULL COMMENT '重み',
	vertical_sort int(11) NOT NULL COMMENT '縦並び順 : タスク縦の並び順に用いる
tCcnt = 1 + SELECT COUNT( * ) FROM task where project_id = :id;',
	list_id int unsigned NOT NULL COMMENT 'リストID',
	created_at timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
	deleted_at datetime COMMENT '削除日',
	PRIMARY KEY (id)
) COMMENT = 'タスクテーブル';


-- ユーザテーブル
CREATE TABLE users
(
	id varchar(255) NOT NULL COMMENT 'id : uid使用想定し、Stringで取れるvarchar',
	name varchar(50) NOT NULL COMMENT 'ユーザ名',
	icon_image varchar(255) COMMENT 'アイコン画像 : アイコン画像',
	online_flg boolean COMMENT 'オンライン状態フラグ',
	hp int(11) COMMENT 'ユーザのHP',
	mp int(11) COMMENT 'ユーザのMP',
	campany varchar(50) COMMENT '企業名',
	occupation_id int unsigned NOT NULL COMMENT '職種ID : 職種テーブルへの外部キー',
	memo varchar(255) COMMENT '人事メモ : 人事が個人へのメモ書きに用いる',
	technology int(11) COMMENT '技術力',
	achievement int(11) COMMENT '達成力',
	motivation int(11) COMMENT '意欲 : やる気',
	solution int(11) COMMENT '問題発見・解決力',
	plan int(11) COMMENT '設計力',
	design int(11) COMMENT 'デザイン力',
	exp int(11) NOT NULL COMMENT '経験値 : 数値からS・A・B・C・D・E・F・Gなど',
	created_at timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
	deleted_at datetime COMMENT '削除日',
	PRIMARY KEY (id)
) COMMENT = 'ユーザテーブル';



/* Create Foreign Keys */

ALTER TABLE list_sorts
	ADD FOREIGN KEY (list_id)
	REFERENCES lists (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE tasks
	ADD FOREIGN KEY (list_id)
	REFERENCES lists (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE projects
	ADD FOREIGN KEY (monster_id)
	REFERENCES monsters (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE users
	ADD FOREIGN KEY (occupation_id)
	REFERENCES occupations (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE groups
	ADD FOREIGN KEY (project_id)
	REFERENCES projects (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE invitations
	ADD FOREIGN KEY (project_id)
	REFERENCES projects (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE lists
	ADD FOREIGN KEY (project_id)
	REFERENCES projects (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE logs
	ADD FOREIGN KEY (project_id)
	REFERENCES projects (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE tasks
	ADD FOREIGN KEY (project_id)
	REFERENCES projects (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE monsters
	ADD FOREIGN KEY (species_id)
	REFERENCES species (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE allocations
	ADD FOREIGN KEY (task_id)
	REFERENCES tasks (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE chats
	ADD FOREIGN KEY (task_id)
	REFERENCES tasks (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE allocations
	ADD FOREIGN KEY (user_id)
	REFERENCES users (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE groups
	ADD FOREIGN KEY (user_id)
	REFERENCES users (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE interests
	ADD FOREIGN KEY (user_id)
	REFERENCES users (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE invitations
	ADD FOREIGN KEY (user_id)
	REFERENCES users (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE logs
	ADD FOREIGN KEY (user_id)
	REFERENCES users (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE qualification
	ADD FOREIGN KEY (user_id)
	REFERENCES users (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;



