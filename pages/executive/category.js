const { default: Navbar } = require('~/components/Navbar');

const category = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[56px]">
                <h2>category</h2>
            </div>
        </div>
    );
};

export default category;
