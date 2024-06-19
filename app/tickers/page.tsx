import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const HISTORY_PER_PAGE = 50

export const metadata = genPageMetadata({ title: 'History' })

export default function TickersPage() {
  const history = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = history.slice(
    HISTORY_PER_PAGE * (pageNumber - 1),
    HISTORY_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(history.length / HISTORY_PER_PAGE),
  }

  return (
    <HistoryLayout
      posts={history}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
