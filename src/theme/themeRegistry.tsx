'use client';
// NextJs
import { useState, useEffect, ReactNode } from "react"
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
// Styles
import styles from "../components/authForm/AuthForm.module.css"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Mui Components
import Box from '@mui/material/Box';
// Components
import Navbar from "@/components/navbar/Navbar";
import { theme } from './theme';
import { AuthContextProvider } from "@/context/AuthContext";
import PreLoader from "@/app/loading/page";
// Framer Motion
import { AnimatePresence, motion } from "framer-motion";
// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/footer/Footer";


interface ThemeRegistryProps {
  options: any;
  children: ReactNode;
}

export default function ThemeRegistry(props: ThemeRegistryProps) {
  const { options, children } = props;

    // Theme Config by Mui
    const [{ cache, flush }] = useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
        const serialized = args[1];
        if (cache.inserted[serialized.name] === undefined) {
            inserted.push(serialized.name);
        }
        return prevInsert(...args);
        };
        const flush = () => {
        const prevInserted = inserted;
        inserted = [];
        return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
        return null;
        }
        let styles = '';
        for (const name of names) {
        styles += cache.inserted[name];
        }
        return (
        <style
            key={cache.key}
            data-emotion={`${cache.key} ${names.join(' ')}`}
            dangerouslySetInnerHTML={{
            __html: styles,
            }}
        />
        );
    });
    // Loading Page
    const [loading, setLoading] = useState(true);

    const onPageLoaded = () => {
        console.log('The page has been fully loaded.');
    };

    useEffect(() => {
        let loadingTimeout: NodeJS.Timeout;
        if (typeof window !== 'undefined') {
            loadingTimeout = setTimeout(() => {
                setLoading(false);
            }, 3000);
            if (document.readyState === 'complete') {
                onPageLoaded();
            } else {
                window.addEventListener('load', onPageLoaded);
            }
        }
        return () => {
            window.removeEventListener('load', onPageLoaded);
            clearTimeout(loadingTimeout);
        };
    }, []);

  return (
    <AuthContextProvider>
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AnimatePresence mode="wait">
                { loading ?
                    <PreLoader/>
                    :
                    <Box key="Pages">
                        <Box component={motion.div} key="Expanded">
                            <ToastContainer
                                position="bottom-center"
                                autoClose={1500}
                                hideProgressBar={false}
                                newestOnTop={false}
                                rtl={false}
                                closeOnClick={false}
                                pauseOnFocusLoss={false}
                                pauseOnHover={false}
                                closeButton={false}
                            />
                            <Navbar/>
                            <Box>
                                {children}
                            </Box>
                            <Footer/>
                        </Box>
                    </Box>
                }
                </AnimatePresence>
            </ThemeProvider>
        </CacheProvider>
    </AuthContextProvider>
  );
}