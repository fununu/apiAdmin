-- DropIndex
DROP INDEX `MailBox_num_key` ON `MailBox`;

-- AlterTable
ALTER TABLE `MailBox` MODIFY `num` BIGINT NOT NULL AUTO_INCREMENT;
