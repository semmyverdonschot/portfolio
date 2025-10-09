import { useEffect } from "react";

type TitleOptions = {
  defaultTitle: string;
  onBlurTitle?: string;
};

export default function useDocumentTitle({
  defaultTitle,
  onBlurTitle,
}: TitleOptions) {
  useEffect(() => {
    document.title = defaultTitle;

    const handleVisibilityChange = () => {
      if (document.hidden && onBlurTitle) {
        setTimeout(() => {
          document.title = onBlurTitle;
        }, 2000);
      } else {
        document.title = defaultTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [defaultTitle, onBlurTitle]);
}
