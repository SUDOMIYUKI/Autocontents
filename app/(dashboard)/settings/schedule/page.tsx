'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SchedulePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          スケジュール設定
        </h1>
        <p className="text-gray-600 mt-2">
          自動投稿のスケジュールを設定
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>投稿スケジュール</CardTitle>
          <CardDescription>
            曜日別の投稿時間とテンプレートを設定できます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            スケジュール設定機能は開発中です。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
