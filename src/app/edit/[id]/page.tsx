import ActionForm from "@/components/ui/ActionForm";
import prisma from "@/lib/prisma";
import { update } from "./action";
import PageContent from "@/components/ui/PageContent";
import PageTitleBar from "@/components/ui/PageTitleBar";
import PageWrapper from "@/components/ui/PageWrapper";

const EditPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const trans = await prisma.transaction.findFirst({
    where: { id: parseInt(params.id) },
  });
  const accounts = await prisma.account.findMany();
  const categories = await prisma.category.findMany();

  return (
    <PageWrapper>
      <PageTitleBar pageTitle="Edit Transaction" withBack />

      <PageContent>
        <ActionForm
          actionHandler={update}
          data={trans}
          categories={categories}
          accounts={accounts}
        />
      </PageContent>
    </PageWrapper>
  );
};

export default EditPage;
