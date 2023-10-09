import { create } from './action';
import PageWrapper from '@/components/PageWrapper';
import PageTitleBar from '@/components/PageTitleBar';
import PageContent from '@/components/PageContent';
import ActionForm from '@/components/ActionForm';

const AddPage = () => {
    return (
        <PageWrapper>
            <PageTitleBar pageTitle="Add Transaction" withBack />

            <PageContent>
                <ActionForm actionHandler={create} />
            </PageContent>
        </PageWrapper>
    )
}

export default AddPage