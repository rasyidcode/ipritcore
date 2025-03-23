"use server";

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteById = async (id: number) => {
  await prisma.transaction.delete({ where: { id: id } });
  revalidatePath("/");
};
