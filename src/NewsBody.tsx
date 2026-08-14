import NewsFetch from './NewsFetch'

export default function NewsBody() {
    return (
        <div className="flex justify-center px-4">
            <div className="flex flex-col w-full max-w-7xl mt-12 mb-20">
                <h1 className="text-white font-bold text-lg">Thought-provoking stories</h1>
                <br></br>
                <div className="flex justify-center">
                    <NewsFetch />
                </div>
            </div>
        </div>
    );
}