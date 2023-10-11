import ActionForm from '@/components/ActionForm';
import prisma from '@/utils/db';
import { update } from './action';
import PageContent from '@/components/PageContent';
import PageTitleBar from '@/components/PageTitleBar';
import PageWrapper from '@/components/PageWrapper';

const EditPage = async ({ params }: { params: { id: string } }) => {
    const trans = await prisma.transaction.findFirst({ where: { id: parseInt(params.id) } })

    return (
        <PageWrapper>
            <PageTitleBar pageTitle="Edit Transaction" withBack />

            <PageContent>
                <ActionForm
                actionHandler={update}
                data={trans}/>
            </PageContent>
        </PageWrapper>
    )
}

export default EditPage