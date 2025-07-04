
export default function Advertisements() {
    return (
        <div className="space-y-4 sticky top-4">

            <div className="bg-white shadow-sm p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Hard Drive Imaging?</h3>
                <div className="flex items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-md mb-3">

                    <div className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-700">True hardware-independent Windows imaging. Only one master image needed for easy deployment regardless of manufacturer. See how!</p>
            </div>

        </div>
    );
}