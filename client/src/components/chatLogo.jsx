const ChatLogo = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl ${
                  i === 4 ? 'bg-primary animate-bounce' : 'bg-primary/10'
                } ${
                  i % 3 === 0 ? 'animate-delay-100' : 
                  i % 3 === 1 ? 'animate-delay-200' : 'animate-delay-300'
                } relative group transition-all duration-300`}
              >
                {/* Speech bubble tail */}
                {i === 4 && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45 transform origin-center" />
                )}
                
                {/* Message icon in center bubble */}
                {i === 4 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-4 border-2 border-base-100 rounded-[3px] relative">
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-base-100 rotate-[135deg]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default ChatLogo;





