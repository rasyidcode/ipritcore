import Layout from "@/components/Layout";

export async function getStaticPaths() {
    
}

export default function Page({  }) {
    return (
        <Layout home={false}>
            <div className="p-4 border grid grid-cols-1">
                <h4 className="mb-4 font-medium underline">Edit New Expense</h4>

                <form className="grid gap-3">
                    <div className="flex flex-row gap-3">
                        <label htmlFor="date" className="text-sm py-1 w-16">Date</label>
                        <input type="date" id="date" name="date" className="border text-sm w-60" />
                    </div>
                    <div className="flex flex-row gap-3">
                        <label htmlFor="amount" className="text-sm py-1 w-16">Amount</label>
                        <input type="number" id="amount" name="amount" className="border text-sm w-60" value={0} />
                    </div>
                    <div className="flex flex-row gap-3">
                        <label htmlFor="type" className="text-sm py-1 w-16">Type</label>
                        <div>
                            <div className="flex flex-row gap-3">
                                <input type="radio" name="type" id="type" value="expenses" />
                                <span className="text-sm py-1">Expenses</span>
                            </div>
                            <div className="flex flex-row gap-3">
                                <input type="radio" name="type" id="type" value="income" />
                                <span className="text-sm py-1">Income</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <label htmlFor="desc" className="text-sm py-1 w-16">Desc</label>
                        <textarea className="border text-sm w-60"></textarea>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="py-1 w-16"></div>
                        <button className="text-sm px-1 border hover:bg-slate-100">Save</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}