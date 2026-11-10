import { Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">MetaMint</h3>
            <p className="text-sm leading-relaxed opacity-90">
              Decentralized NFT marketplace empowering creators on the Polygon blockchain.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/Dhanu188/metamint-genesis"
                aria-label="Source code on GitHub"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#mint" className="block text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
                Mint NFT
              </a>
              <a href="#gallery" className="block text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
                Gallery
              </a>
              <a href="#about" className="block text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
                About
              </a>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <nav className="space-y-2">
              <a 
                href="https://polygon.technology/" 
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Polygon Network
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://metamask.io/" 
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                MetaMask Wallet
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://amoy.polygonscan.com/" 
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amoy Explorer
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://faucet.polygon.technology/" 
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amoy Faucet
                <ExternalLink className="w-3 h-3" />
              </a>
            </nav>
          </div>

          {/* Testnet Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Testnet Info</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="font-medium text-primary mb-1">Network</div>
                <div className="opacity-90">Polygon Amoy Testnet</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="font-medium text-primary mb-1">Chain ID</div>
                <div className="opacity-90">80002</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="font-medium text-primary mb-1">Currency</div>
                <div className="opacity-90">POL (Testnet)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm opacity-90">
            © {new Date().getFullYear()} MetaMint. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;