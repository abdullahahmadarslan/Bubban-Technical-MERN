export const Footer = () => {
    // getting year
    const fullYear = new Date().getFullYear();

    return (
        <footer className="footer">Copyrights @ {fullYear} </footer>
    );
};
