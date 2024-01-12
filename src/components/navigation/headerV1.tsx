import { Container, Flex, List } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

interface HeaderProps {
  title: string;
  href: string;
  icon: ReactElement;
  items: string[];
  external: string;
  slug: string;
}

const HeaderV1 = ({ headerNav }: { headerNav: HeaderProps[] | [] }) => {
  const router = useRouter();
  const [active, setActive] = useState('');
  useEffect(() => {
    const currentPath = router.asPath.split('?')[0]?.split('/')[2];

    const activeItem = headerNav.find(item => {
      return item.slug === currentPath;
    });

    if (activeItem) {
      setActive(activeItem.slug);
    }
  }, [router.asPath]);

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
          <div className="flex w-full ms-2 flex-row items-center justify-between">
            <nav>
              <List className="flex flex-row">
                {headerNav && headerNav.length > 0 ? (
                  headerNav.map((item, index) => (
                    <List.Item
                      key={index}
                      className={`py-1 hover:border-b-2 hover:-mb-1 border-b-primary-900 mx-4 ${
                        active === item.slug && 'border-b-2 -mb-1'
                      } `}
                    >
                      <Link
                        style={{
                          color: 'var(--mantine-color-primary-9)',
                          fontWeight: 500,
                          fontSize: 18,
                          padding: '10px 20px',
                        }}
                        href={item.href}
                      >
                        {item.title}
                      </Link>
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
