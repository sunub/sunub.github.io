"use client";

import styled from "styled-components";
import { FlexCenter } from "@/shared/style/Flex";

function NewestPostSkeleton() {
	return (
		<Wrapper>
			<Skeleton />
			<SkeletonWrapper>
				<SkeletonContent>
					{Array.from({ length: 5 }, (_, i) => i).map((key) => (
						<div key={`skeleton-item-${key}`}>
							<SkeletonItem />
							<SkeletonItemShort />
							<SkeletonItemShort />
						</div>
					))}
				</SkeletonContent>
			</SkeletonWrapper>
		</Wrapper>
	);
}
const Wrapper = styled(FlexCenter)`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const Skeleton = styled.div`
  width: 48px;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SkeletonItem = styled.div`
  width: 75%;
  height: 1rem;
  background-color: #f3f4f6;
  border-radius: 4px;
`;

const SkeletonItemShort = styled.div`
  width: 25%;
  height: 1rem;
  background-color: #f3f4f6;
  border-radius: 4px;
`;

export { NewestPostSkeleton };
