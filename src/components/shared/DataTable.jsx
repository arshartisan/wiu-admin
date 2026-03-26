import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Search, PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 8

export default function DataTable({
  columns, data, searchPlaceholder = 'Search...',
  onRowClick, renderCell, renderActions, toolbar, emptyMessage = 'No data found.',
}) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(q)))
  }, [data, search])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }
  const toggleSelectAll = () => selected.length === paged.length ? setSelected([]) : setSelected(paged.map(r => r.id))
  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="pl-9 h-8 text-sm transition-all duration-200 focus-visible:shadow-[0_0_0_3px_rgba(193,114,79,0.1)]"
          />
        </div>
        {toolbar}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={selected.length === paged.length && paged.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                {columns.map(col => (
                  <th
                    key={col.key}
                    onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                    className={cn(
                      'px-4 py-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap',
                      col.sortable && 'cursor-pointer hover:text-text-primary select-none transition-colors duration-150'
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && (
                        sortKey === col.key
                          ? (sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)
                          : <ChevronsUpDown className="h-3 w-3 opacity-30" />
                      )}
                    </div>
                  </th>
                ))}
                {renderActions && (
                  <th className="px-4 py-3 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + (renderActions ? 2 : 1)} className="text-center py-20 text-muted-foreground">
                      <motion.div
                        className="flex flex-col items-center gap-3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
                          <PackageOpen className="h-6 w-6 text-muted-foreground/60" />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary text-base">{emptyMessage}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Try adjusting your filters or search term</p>
                        </div>
                      </motion.div>
                    </td>
                  </tr>
                ) : (
                  paged.map((row, i) => (
                    <motion.tr
                      key={row.id || i}
                      className={cn(
                        'border-b border-border last:border-0 transition-colors duration-150',
                        onRowClick && 'cursor-pointer hover:bg-muted/20',
                        selected.includes(row.id) && 'bg-secondary/30'
                      )}
                      onClick={() => onRowClick && onRowClick(row)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                    >
                      <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                        <Checkbox checked={selected.includes(row.id)} onCheckedChange={() => toggleSelect(row.id)} />
                      </td>
                      {columns.map(col => (
                        <td key={col.key} className="px-4 py-3.5 text-text-primary text-[13px]">
                          {renderCell ? renderCell(col.key, row) : row[col.key]}
                        </td>
                      ))}
                      {renderActions && (
                        <td className="px-4 py-3.5 text-right" onClick={e => e.stopPropagation()}>
                          {renderActions(row)}
                        </td>
                      )}
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          {sorted.length} result{sorted.length !== 1 ? 's' : ''}
          {selected.length > 0 && (
            <motion.span
              className="ml-2 text-primary font-medium"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {selected.length} selected
            </motion.span>
          )}
        </span>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="h-7 w-7 p-0 transition-all duration-150 hover:border-primary/30" onClick={() => setPage(p => p - 1)} disabled={page <= 1}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="font-medium text-text-primary px-1">
            {page} <span className="text-muted-foreground font-normal">/ {Math.max(1, totalPages)}</span>
          </span>
          <Button variant="outline" size="sm" className="h-7 w-7 p-0 transition-all duration-150 hover:border-primary/30" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
