const { default: Navbar } = require('~/components/Navbar');

const statistics = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[56px]">
                <h2>statistics bao hanh</h2>
            </div>
        </div>
    );
};

export default statistics;
