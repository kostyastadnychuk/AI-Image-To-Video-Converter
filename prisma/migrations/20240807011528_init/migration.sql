-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `remember_status` VARCHAR(191) NULL,
    `token` VARCHAR(191) NULL,
    `role` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `lastaccess_time` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `method` VARCHAR(191) NULL,
    `accept_status` INTEGER NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL,
    `accepted_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tokenId` BIGINT NULL,
    `path` VARCHAR(191) NULL,
    `videotoken` BIGINT NULL,
    `userid` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL,
    `delete_status` BOOLEAN NULL,

    UNIQUE INDEX `Images_tokenId_key`(`tokenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Videos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `imageid` INTEGER NOT NULL,
    `videotoken` BIGINT NOT NULL,
    `videopath` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifypayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wallet_id` INTEGER NOT NULL,
    `userid` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL,

    UNIQUE INDEX `notifypayment_wallet_id_key`(`wallet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `m_magic_bullet` BOOLEAN NOT NULL DEFAULT false,
    `m_aimbot` BOOLEAN NOT NULL DEFAULT false,
    `m_aimbot_sniper_mode` BOOLEAN NOT NULL DEFAULT false,
    `m_aimbot_vischeck` BOOLEAN NOT NULL DEFAULT false,
    `m_aim_index` INTEGER NOT NULL DEFAULT 0,
    `m_aim_bone_index` INTEGER NOT NULL DEFAULT 0,
    `m_sniper_index` INTEGER NOT NULL DEFAULT 0,
    `m_sniper_smooth` INTEGER NOT NULL DEFAULT 10,
    `m_smooth` INTEGER NOT NULL DEFAULT 10,
    `m_hitbox` INTEGER NOT NULL DEFAULT 20,
    `m_fov` INTEGER NOT NULL DEFAULT 200,
    `m_draw_box` BOOLEAN NOT NULL DEFAULT false,
    `m_draw_skel` BOOLEAN NOT NULL DEFAULT false,
    `m_thickness` DOUBLE NOT NULL DEFAULT 1.0,
    `m_draw_info` BOOLEAN NOT NULL DEFAULT false,
    `m_draw_bomb` BOOLEAN NOT NULL DEFAULT false,
    `m_draw_fov` BOOLEAN NOT NULL DEFAULT false,
    `m_mode_check` BOOLEAN NOT NULL DEFAULT false,
    `m_hit_range` BOOLEAN NOT NULL DEFAULT false,
    `m_hit_range_press` BOOLEAN NOT NULL DEFAULT false,
    `m_hit_range_value` INTEGER NOT NULL DEFAULT 30,
    `m_weapon_call` BOOLEAN NOT NULL DEFAULT false,
    `m_weapon_num0_enable` BOOLEAN NOT NULL DEFAULT false,
    `m_weapon_num1_enable` BOOLEAN NOT NULL DEFAULT false,
    `m_weapon_num2_enable` BOOLEAN NOT NULL DEFAULT false,
    `m_weapon_num3_enable` BOOLEAN NOT NULL DEFAULT false,
    `m_weapon_num4_enable` BOOLEAN NOT NULL DEFAULT false,
    `m_weapon_num0` INTEGER NOT NULL DEFAULT 0,
    `m_weapon_num1` INTEGER NOT NULL DEFAULT 0,
    `m_weapon_num2` INTEGER NOT NULL DEFAULT 0,
    `m_weapon_num3` INTEGER NOT NULL DEFAULT 0,
    `m_weapon_num4` INTEGER NOT NULL DEFAULT 0,
    `m_enemy_color` VARCHAR(191) NOT NULL DEFAULT '#ff0000',
    `m_bone_vis_color` VARCHAR(191) NOT NULL DEFAULT '#ff0000',

    UNIQUE INDEX `Config_userid_key`(`userid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
