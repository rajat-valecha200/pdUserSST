import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-96 text-center space-y-6">
        <div className="text-6xl font-bold text-gray-300">404</div>
        <h1 className="text-3xl font-bold text-gray-800">Page not found</h1>
        <p className="text-gray-600 max-w-md">
          The page you're looking for doesn't exist. Let me help you get back on
          track.
        </p>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
            Back to home
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
