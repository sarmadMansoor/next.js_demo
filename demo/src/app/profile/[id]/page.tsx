// app/profile/[id]/page.tsx

interface Props {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: Props) {
  return (
    <div>
      userProfile: {params.id}
    </div>
  );
}
