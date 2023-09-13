'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input, InputContainer } from '~/components/ui/input';
import { useToast } from '~/components/ui/use-toast';

// prettier-ignore
const profileFormSchema = z.object({
  id: z
    .string({ required_error: '* 필수 정보입니다.' })
    .regex(/^[0-9a-z_\-]{5,20}$/, '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'),
  pswd: z
    .string({ required_error: '* 필수 정보입니다.' })
    .regex(/^[0-9a-zA-Z$&+,:;=?@#|'<>.^*()%!-]{8,16}$/, '8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.'),
  email: z
    .string()
    .email({
      message: "이메일 주소가 정확한지 확인해 주세요.",
    })
    .optional()
    .or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {},
  });

  const [showPswd, setShowPswd] = useState(false);

  function onSubmit(values: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="아이디" {...field} />
              </FormControl>
              <FormMessage className="text-xs content-[#]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pswd"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <InputContainer>
                    <input
                      placeholder="비밀번호"
                      type={showPswd ? 'text' : 'password'}
                      {...field}
                    />
                    <button
                      className="text-sm active:opacity-70"
                      type="button"
                      onClick={() => setShowPswd(!showPswd)}
                    >
                      {showPswd ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </InputContainer>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder="[선택] 이메일" className="" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-full">
          가입하기
        </Button>
      </form>
    </Form>
  );
}
