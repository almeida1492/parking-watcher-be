import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function removeOldReports() {
  const reports = await prisma.report.findMany({});

  const toRemoveIds = reports
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

  toRemoveIds.forEach(async (id) => {
    try {
      const deleted = await prisma.report.delete({
        where: {
          id,
        },
      });
      console.dir({ id: deleted.id }, { depth: Infinity });
    } catch (error) {
      console.log(error);
    }
  });

  console.log(`🗑 Successfully deleted ${toRemoveIds.length} reports.`);
}

removeOldReports();
