import { create } from './action';
import PageWrapper from '@/components/PageWrapper';
import PageTitleBar from '@/components/PageTitleBar';
import PageContent from '@/components/PageContent';
import ActionForm from '@/components/ActionForm';
import prisma from '@/utils/db';

const AddPage = async () => {
    const accounts = await prisma.account.findMany()
    const categories = await prisma.category.findMany()

    return (
        <PageWrapper>
            <PageTitleBar pageTitle="Add Transaction" withBack />

            <PageContent>
                <ActionForm
                    actionHandler={create}
                    accounts={accounts}
                    categories={categories} />
            </PageContent>
        </PageWrapper>
    )
}

export default AddPage