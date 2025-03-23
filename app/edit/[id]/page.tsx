import ActionForm from '@/components/ActionForm';
import prisma from '@/lib/prisma';
import { update } from './action';
import PageContent from '@/components/PageContent';
import PageTitleBar from '@/components/PageTitleBar';
import PageWrapper from '@/components/PageWrapper';

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
