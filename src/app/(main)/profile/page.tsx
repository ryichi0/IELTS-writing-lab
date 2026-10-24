import Image from 'next/image'
import { notFound } from 'next/navigation'
import ProfileStatics from './_components/ProfileStatics'
import EditProfileRow from './_components/EditProfileRow'
import { getCurrentProfile } from '@/lib/profile'
import { getProfileStats } from '@/lib/stats'
import { formatCompact, formatDate } from '@/lib/format'

export default async function Profile() {
  const [profile, stats] = await Promise.all([
    getCurrentProfile(),
    getProfileStats(),
  ])

  if (!profile || !stats) notFound()

  return (
    <section className="flex flex-col md:flex-row gap-5 md:gap-8 md:items-start">
      <div className="p-5 md:p-8 flex flex-col gap-4 md:gap-6 items-center bg-surface rounded-lg border border-border md:flex-3 md:min-w-100">
        <Image
          src={profile.avatarUrl ?? '/avatar-large.jpg'}
          alt="avatar"
          width={120}
          height={120}
          className="size-30 rounded-full object-cover"
        />

        <div className="text-center">
          <p className="text-h2">{profile.name}</p>
          <small className="text-body text-foreground-secondary">{profile.email}</small>
        </div>

        <div className="border-t border-border w-full"></div>

        <div className="w-full">
          <div className="flex justify-between mb-2">
            <span className="text-foreground-muted text-body">MEMBER SINCE</span>
            <span className="font-bold">{formatDate(profile.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground-muted text-body">TARGET SCORE</span>
            <span className="font-bold text-primary">
              {profile.targetScore?.toFixed(1) ?? '—'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-3/5">
        <div className="md:bg-surface rounded-lg md:border border-border md:p-8 flex flex-col md:gap-5">
          <h4 className="hidden md:block text-h4 font-bold">Practice Performance Summary</h4>
          <div className="grid grid-cols-3 gap-2">
            <ProfileStatics statics={String(stats.attempts)} title="Attempts" />
            <ProfileStatics statics={formatCompact(stats.totalWords)} title="Total words" />
            <ProfileStatics
              statics={`${stats.streak} ${stats.streak === 1 ? 'Day' : 'Days'}`}
              title="Streak"
            />
          </div>
        </div>

        <div className="p-4 md:p-8 flex flex-col gap-4 md:gap-6 bg-surface rounded-lg border border-border">
          <h4 className="text-foreground-muted text-h4 font-bold md:text-black">Account Preferences</h4>
          <div className="flex flex-col gap-4">
            <EditProfileRow
              profile={{
                name: profile.name,
                email: profile.email,
                avatarUrl: profile.avatarUrl,
                targetScore: profile.targetScore,
              }}
            />

            <div className="border-t border-border w-full"></div>

            <div className="flex justify-between">
              <div>
                <p className="font-bold md:text-sm">Change Password</p>
                <span className="text-body-sm text-foreground-secondary">Keep your account highly secure</span>
              </div>
              <Image className="rotate-90 self-center" src="/chevron-up.png" width={16} height={16} alt="" />
            </div>

            <div className="border-t border-border w-full"></div>

            <div className="flex justify-between">
              <div>
                <p className="font-bold md:text-sm">Daily Notifications</p>
                <span className="text-body-sm text-foreground-secondary">Get prompt alerts of the day</span>
              </div>
              <Image className="rotate-90 self-center" src="/chevron-up.png" width={16} height={16} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}