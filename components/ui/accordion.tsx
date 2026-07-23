'use client';

import * as React from 'react';
import { Icons } from '@/components/constants/icons';
import { motion, AnimatePresence } from 'framer-motion';

type AccordionContextType = {
  value: string | string[] | undefined;
  onValueChange: (value: string | string[] | undefined) => void;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
};

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

const Accordion = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'value'> & {
    type?: 'single' | 'multiple';
    collapsible?: boolean;
    value?: string | string[];
    onValueChange?: (value: string | string[] | undefined) => void;
  }
>(({ className, type = 'single', collapsible = false, children, value: externalValue, onValueChange: externalOnChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState<string | string[] | undefined>(
    type === 'multiple' ? [] : undefined
  );

  const value = externalValue !== undefined ? externalValue : internalValue;
  const onValueChange = externalOnChange || setInternalValue;

  return (
    <AccordionContext.Provider value={{ value, onValueChange, type, collapsible }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = 'Accordion';

const AccordionItemContext = React.createContext<{ value: string; isOpen: boolean }>({ value: '', isOpen: false });

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be inside Accordion');
  
  const isOpen = Array.isArray(context.value) 
    ? context.value.includes(value) 
    : context.value === value;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div ref={ref} className={`border-b ${className || ''}`} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { onValueChange, value: activeValue, type, collapsible } = React.useContext(AccordionContext) || {};
  const { value, isOpen } = React.useContext(AccordionItemContext);

  const toggle = () => {
    if (onValueChange) {
      if (type === 'multiple') {
        const currentValue = Array.isArray(activeValue) ? activeValue : [];
        if (isOpen) {
          onValueChange(currentValue.filter((v) => v !== value));
        } else {
          onValueChange([...currentValue, value]);
        }
      } else {
        if (isOpen && collapsible) {
          onValueChange(undefined);
        } else {
          onValueChange(value);
        }
      }
    }
  };

  return (
    <div className="flex">
      <button
        ref={ref}
        onClick={toggle}
        className={`flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline ${className || ''}`}
        {...props}
      >
        {children}
        <Icons.chevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, onDrag, ...props }, ref) => {
  const { isOpen } = React.useContext(AccordionItemContext);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          ref={ref as any}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
          {...(props as any)}
        >
          <div className={`pb-4 pt-0 ${className || ''}`}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
