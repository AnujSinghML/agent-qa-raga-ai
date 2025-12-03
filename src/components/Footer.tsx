const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-display text-gradient">QA.guide</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            A systematic approach to testing AI agents in production.
          </p>

          <div className="text-sm text-muted-foreground">
            Built with conviction.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
