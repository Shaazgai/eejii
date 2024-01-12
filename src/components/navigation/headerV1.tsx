import { Anchor, Container, Flex, List } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';

interface HeaderProps {
  title: string;
  href: string;
  icon: ReactElement;
  items: string[];
  external: string;
}

const HeaderV1 = ({ headerNav }: { headerNav: HeaderProps[] | [] }) => {
  return (
    <div className="fixed left-0 top-0 z-10 w-full border-b border-b-gray-200 bg-white">
      <Container size={'xl'}>
        <Flex align={'center'} p={10}>
          <Link href="/v" className="min-w-[160px]">
            <Image
              alt="logo"
              src={'/images/foundation_logo.jpg'}
              width={160}
              height={50}
            />
          </Link>
          <div className="flex w-full flex-row items-center justify-between">
            <nav>
              <List className="flex flex-row">
                {headerNav && headerNav.length > 0 ? (
                  headerNav.map((item, index) => (
                    <List.Item
                      key={index}
                      className="py-1 hover:border-b-2 hover:-mb-1 border-b-primary-900 mx-4 "
                    >
                      <Anchor
                        c={'primary.9'}
                        fw={500}
                        size="lg"
                        underline="never"
                        href={item.href}
                        px={10}
                      >
                        {item.title}
                      </Anchor>
                    </List.Item>
                  ))
                ) : (
                  <></>
                )}
              </List>
            </nav>
            <div>
              <span></span>
            </div>
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default HeaderV1;
