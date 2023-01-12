import { FunctionComponent, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown';
import Image from 'next/image'

type Props = {
  children: any
}

const Markdown: FunctionComponent<Props> = ({children}) => (
  <ReactMarkdown
    components={{
      p: props => {
        // @ts-ignore (Not sure what to do here, so I'm just going to be lazy)
        return props.children[0].type?.name === "img" ? (
          <div {...props} />
        ) : (
          <p {...props} />
        )
      },
      img: ({
        alt,
        src,
        title,
      }: {
        alt?: string;
        src?: string;
        title?: string;
      }) => (
        <div className={'image-container'}>
          <Image
            alt={alt}
            src={src as string}
            title={title}
            layout="fill"
            className='image'
          />
        </div>
      ),
    }}
  >
    { children }
  </ReactMarkdown>
);

export default Markdown;