import NewsFetch from './NewsFetch'

export default function NewsBody() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-320 mt-12 mb-20">
                <h1 className="text-white font-bold">Thought-provoking stories</h1>
                <br></br>
                <div className="flex column justify-center">
                    <NewsFetch />
                </div>
            </div>
        </div>
    );
}