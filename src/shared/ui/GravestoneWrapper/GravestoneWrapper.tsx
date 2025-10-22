const GravestoneWrapper = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <div className="bg-bg-intro shadow-intro relative flex flex-col gap-6 rounded-xl p-3 lg:rounded-3xl lg:p-6">
      {children}
    </div>
  );
};

export default GravestoneWrapper;
