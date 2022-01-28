import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function removeOldReports() {
  const activeReports = await prisma.report.findMany({
    where: { isActive: true },
  });

  const toDeactivateIdList = activeReports
    .map((report) => {
      const currentDate = new Date();
      const creationDate = new Date(report.createdAt);

      const _diff =
        (currentDate.getTime() - creationDate.getTime()) / 1000 / 60;
      const diff = Math.abs(Math.round(_diff));

      if (diff > 20) {
        return report.id;
      }
    })
    .filter((id) => id);

  toDeactivateIdList.forEach(async (id) => {
    try {
      const updatedReport = await prisma.report.update({
        where: {
          id,
        },
        data: { isActive: false },
      });
      console.dir({ id: updatedReport.id }, { depth: Infinity });
    } catch (error) {
      console.log(error);
    }
  });

  console.log(
    "⏱ ",
    `Deactivating ${toDeactivateIdList.length} ${
      toDeactivateIdList.length >= 2 ? "reports" : "report"
    }.`
  );
}

removeOldReports();
