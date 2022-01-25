import { PrismaClient } from "@prisma/client";
import express from "express";
import { ICoordinates } from "./types";
import { getIsWithinRange } from "./utils";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.get("/reports", async (req, res) => {
  const reports = await prisma.report.findMany({ where: { isActive: true } });
  res.json(reports);
});

app.get("/reports/:id", async (req, res) => {
  const { id } = req.params;

  const report = await prisma.report.findUnique({
    where: { id: Number(id) },
  });

  res.json(report);
});

app.post("/reports/create", async (req, res) => {
  const { body: reportData } = req;

  reportData.createdAt = +new Date();
  reportData.isActive = true;

  const newReport = await prisma.report.create({ data: reportData });

  res.json(newReport);
});

app.post("/reports/deactivate/:id", async (req, res) => {
  const { id } = req.params;
  const { body: claimantCoordinates } = req;

  const report = await prisma.report.findUnique({ where: { id: Number(id) } });

  if (!report) {
    res.status(404).json("Report not found");
    return;
  }

  const reportCoordinates: ICoordinates = {
    lat: report.lat,
    lng: report.lng,
  };

  const isWithinRange = getIsWithinRange(
    claimantCoordinates,
    reportCoordinates
  );

  if (isWithinRange) {
    const updatedReport = await prisma.report.update({
      where: { id: Number(id) },
      data: { isActive: false },
    });
    res.json(updatedReport);
  } else {
    res.status(400).json("The claimant position is out of the accepted range");
  }
});

const PORT = process.env.PORT;

console.log(process.env.NODE_ENV);

app.listen(PORT, () => console.log(`🚀 Server's running at port ${PORT}`));
