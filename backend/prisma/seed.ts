import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Result, Course, Student, Teacher, User } from "@prisma/client";

const users: User[] = [
  {
    id: 1,
    name: "Bruno",
    email: "email@email.com",
    document: "12346",
    password: "1234",
    created_at: new Date(),
    updated_at: new Date(),
    role: "master",
  },
];

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Mary Lee",
    password: "123456",
    email: "mary@education.com",
    document: "12313",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: "Marta Gates",
    password: "123456",
    email: "marta@education.com",
    document: "12313",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    name: "Matt Penn",
    password: "4567",
    email: "matt@education.com",
    document: "1321654",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    name: "Suzane Sims",
    password: "4567",
    email: "suzane@education.com",
    document: "1321654",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 5,
    name: "Paul bates",
    password: "4567",
    email: "paul@education.com",
    document: "1321654",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 6,
    name: "Chris Gray",
    password: "4567",
    email: "chris@education.com",
    document: "1321654",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 7,
    name: "Bart Louis",
    password: "4567",
    email: "bart@education.com",
    document: "1321654",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 8,
    name: "Gary Levine",
    password: "4567",
    email: "gary@education.com",
    document: "1321654",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const students: Student[] = [
  {
    id: 1,
    name: "kelly brown",
    password: "4567",
    email: "kelly@education.com",
    document: "1321654",
    year: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: "Matt Jorand",
    password: "4567",
    email: "matt@education.com",
    document: "1321654",
    year: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const courses: Course[] = [
  { id: 1, name: "Math", teacherId: 1 },
  { id: 2, name: "Science", teacherId: 2 },
  { id: 3, name: "Geography", teacherId: 3 },
  { id: 4, name: "History", teacherId: 4 },
  { id: 5, name: "Spanish", teacherId: 5 },
  { id: 6, name: "English", teacherId: 6 },
  { id: 7, name: "Chemistry", teacherId: 7 },
  { id: 8, name: "Physics", teacherId: 8 },
];

const results: Result[] = [
  {
    id: 1,
    grade: 0,
    courseId: 1,
    studentId: 1,
  },
  {
    id: 2,
    grade: 0,
    courseId: 2,
    studentId: 1,
  },
  {
    id: 3,
    grade: 0,
    courseId: 3,
    studentId: 1,
  },
  {
    id: 4,
    grade: 0,
    courseId: 4,
    studentId: 1,
  },
  {
    id: 5,
    grade: 0,
    courseId: 5,
    studentId: 1,
  },
  {
    id: 6,
    grade: 0,
    courseId: 6,
    studentId: 1,
  },
  {
    id: 7,
    grade: 0,
    courseId: 7,
    studentId: 1,
  },
  {
    id: 8,
    grade: 0,
    courseId: 8,
    studentId: 1,
  },
  {
    id: 9,
    grade: 0,
    courseId: 1,
    studentId: 2,
  },
  {
    id: 10,
    grade: 0,
    courseId: 2,
    studentId: 2,
  },
  {
    id: 11,
    grade: 0,
    courseId: 3,
    studentId: 2,
  },
  {
    id: 12,
    grade: 0,
    courseId: 4,
    studentId: 2,
  },
  {
    id: 13,
    grade: 0,
    courseId: 5,
    studentId: 2,
  },
  {
    id: 14,
    grade: 0,
    courseId: 6,
    studentId: 2,
  },
  {
    id: 15,
    grade: 0,
    courseId: 7,
    studentId: 2,
  },
  {
    id: 16,
    grade: 0,
    courseId: 8,
    studentId: 2,
  },
];

async function main() {
  console.log(`Start seeding ...`);

  console.log(`Start seeding ... students`);

  for (const item of students) {
    await prisma.student.create({
      data: item,
    });
  }

  console.log(`Start seeding ... teachers`);

  for (const item of teachers) {
    await prisma.teacher.create({
      data: item,
    });
  }

  console.log(`Start seeding ... course`);

  for (const item of courses) {
    await prisma.course.create({
      data: item,
    });
  }

  console.log(`Start seeding ... results`);

  for (const item of results) {
    await prisma.result.create({
      data: item,
    });
  }

  console.log(`Start seeding ... users`);
  for (const item of users) {
    await prisma.user.create({
      data: item,
    });
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
