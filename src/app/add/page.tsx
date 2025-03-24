import { create } from "./action";
import PageWrapper from "@/components/ui/PageWrapper";
import PageTitleBar from "@/components/ui/PageTitleBar";
import PageContent from "@/components/ui/PageContent";
import ActionForm from "@/components/ui/ActionForm";
import prisma from "@/lib/prisma";

const AddPage = async () => {
  const accounts = await prisma.account.findMany();
  const categories = await prisma.category.findMany();

  return (
    <PageWrapper>
      <PageTitleBar pageTitle="Add Transaction" withBack />

      <PageContent>
        <ActionForm
          actionHandler={create}
          accounts={accounts}
          categories={categories}
        />
      </PageContent>
    </PageWrapper>
  );
};

export default AddPage;
