CREATE DATABASE IF NOT EXISTS frontend_bible DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE frontend_bible;

DROP TABLE IF EXISTS `mistakes`;
DROP TABLE IF EXISTS `questions`;
DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '分类名称',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `knowledge_point` varchar(100) DEFAULT NULL COMMENT '所属知识点',
  `type` varchar(20) NOT NULL DEFAULT 'single' COMMENT '题型：single单选, multiple多选, code编程实操',
  `title` text NOT NULL COMMENT '题干',
  `options` json DEFAULT NULL COMMENT '选项列表 JSON 格式',
  `answer` varchar(255) NOT NULL COMMENT '正确答案',
  `explanation` text COMMENT '答案解析或参考代码',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `mistakes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question_id` bigint unsigned NOT NULL,
  `error_count` int unsigned NOT NULL DEFAULT 1,
  `is_resolved` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` bigint NOT NULL DEFAULT 0,
  `updated_at` bigint NOT NULL DEFAULT 0,
  `deleted_at` bigint NOT NULL DEFAULT 0,
  `is_del` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_question` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `knowledge_docs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `parent_title` varchar(255) DEFAULT NULL COMMENT '父级标题（如二级标题）',
  `knowledge_point` varchar(255) NOT NULL COMMENT '当前知识点标题（如三级或二级标题）',
  `content` text NOT NULL COMMENT '该标题下的文档内容',
  `created_at` bigint NOT NULL DEFAULT 0,
  `updated_at` bigint NOT NULL DEFAULT 0,
  `deleted_at` bigint NOT NULL DEFAULT 0,
  `is_del` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
