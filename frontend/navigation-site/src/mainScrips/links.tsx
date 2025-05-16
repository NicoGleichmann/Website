import { useEffect } from 'react';

function ExternalLink() {
  // Handler für das Klicken auf Links
  const handleLinkClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("case")) {
      const url = target.getAttribute("data-link");
      if (url) {
        window.open(url, "_self"); // Link im selben Tab öffnen
      }
    }
  };

  // useEffect für Event-Listener
  useEffect(() => {
    // Event-Listener für Klick auf Links
    document.addEventListener("click", handleLinkClick as unknown as EventListener);

    // Cleanup für Event-Listener bei der Demontage der Komponente
    return () => {
      document.removeEventListener("click", handleLinkClick as unknown as EventListener);
    };
  }, []);

  return null; // Keine sichtbare Änderung auf der Seite, nur Event-Handling
}

export default ExternalLink;
