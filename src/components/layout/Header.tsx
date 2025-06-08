interface IProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: IProps) => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </header>
  );
};

export default Header;
