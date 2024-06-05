-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVATE', 'DEACTIVATE');

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "specialNeeds" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVATE';
