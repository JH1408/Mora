'use client';

import * as React from 'react';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils/utils';

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot='alert-dialog-overlay'
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-neutral-12/50',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal data-slot='alert-dialog-portal'>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot='alert-dialog-content'
        className={cn(
          'bg-background-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-neutral-4 p-6 shadow-primary duration-200 sm:max-w-lg',
          className
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-dialog-header'
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-dialog-footer'
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot='alert-dialog-title'
      className={cn(
        'text-lg leading-none font-semibold text-text-primary',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot='alert-dialog-description'
      className={cn('text-text-secondary text-sm', className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : AlertDialogPrimitive.Action;

  return (
    <Comp
      data-slot='alert-dialog-action'
      className={cn(
        !asChild &&
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer bg-primary text-white shadow-sm hover:bg-primary-800 focus-visible:ring-primary-300 active:bg-primary-600 disabled:bg-primary-300 h-9 px-4 py-2 has-[>svg]:px-3',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> & {
  asChild?: boolean;
}) {
  if (asChild) {
    return (
      <AlertDialogPrimitive.Cancel asChild {...props}>
        {children}
      </AlertDialogPrimitive.Cancel>
    );
  }

  return (
    <AlertDialogPrimitive.Cancel
      data-slot='alert-dialog-cancel'
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer border-2 border-neutral-4 bg-transparent text-text-secondary shadow-sm hover:bg-neutral-1 hover:text-text-primary focus-visible:ring-neutral-300 active:bg-neutral-2 active:text-text-primary disabled:border-neutral-2 disabled:text-neutral-400 h-9 px-4 py-2 has-[>svg]:px-3',
        className
      )}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Cancel>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
