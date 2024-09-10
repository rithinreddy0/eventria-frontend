import { useEffect, useState } from "react";



const GoogleFormEmbed = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  

  const handleIframeLoad = (event) => {
    // console.log(event)
    console.log("hii")
    // const iframeDoc = event.target.contentDocument || event.target.contentWindow.document;
    // console.log(iframeDoc)
    // if (iframeDoc.body.innerText.includes('Your response has been recorded')) {
    //   setIsSubmitted(true);
    // }
  };

  return (
    <div>
     
        
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSenxOrbvTcZclBR9xu6esKLIGWvtIMe7h1TJ-E6_0ec8cb4IA/viewform?embedded=true" width="640"
         height="1448" 
         frameborder="0" 
         marginheight="0" 
         marginwidth="0"
         onLoad={handleIframeLoad}>
            Loading…
        </iframe>
      
    </div>
  );
};

export default GoogleFormEmbed;
