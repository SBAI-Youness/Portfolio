import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-start justify-center pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-8 max-w-[500px]"
            >
                {/* 404 Number */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="text-9xl font-bold text-white/20">
                        404
                    </div>
                </motion.div>

                {/* Error Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-4"
                >
                    <h1 className="text-3xl font-bold text-white">
                        Page Not Found
                    </h1>
                    <p className="text-white/60 text-lg">
                        The page you're looking for doesn't exist.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link to="/">
                        <Button className="gap-2 group">
                            <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            Back to Home
                        </Button>
                    </Link>
                    <Button variant="outline" className="gap-2" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
