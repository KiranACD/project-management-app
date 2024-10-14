import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateProjectSequence() {
  try {
    const result = await prisma.$queryRaw`
      SELECT setval(pg_get_serial_sequence('"Task"', 'id'), coalesce(max(id) + 1, 1), false) 
      FROM "Task"
    `
    console.log('Sequence updated successfully:', result)
  } catch (error) {
    console.error('Error updating sequence:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateProjectSequence()