-- CreateTable
CREATE TABLE "employee_salary" (
    "id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "emp_name" TEXT NOT NULL,
    "month" DECIMAL(2,0) NOT NULL,
    "year" DECIMAL(4,0) NOT NULL,
    "total_salary" DECIMAL(10,2) NOT NULL,
    "epf" DECIMAL(10,2) NOT NULL,
    "etf" DECIMAL(10,2) NOT NULL,
    "tax_reduction" DECIMAL(10,2) NOT NULL,
    "other_reduction" DECIMAL(10,2) NOT NULL,
    "net_salary" DECIMAL(10,2) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "employee_salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_salary_log" (
    "id" SERIAL NOT NULL,
    "record_id" INTEGER NOT NULL,
    "operation" TEXT NOT NULL,
    "new_val" JSONB NOT NULL,
    "old_val" JSONB NOT NULL,

    CONSTRAINT "employee_salary_log_pkey" PRIMARY KEY ("id")
);
