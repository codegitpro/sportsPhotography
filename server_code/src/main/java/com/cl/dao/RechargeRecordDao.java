package com.cl.dao;

import com.cl.entity.RechargeRecordEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.RechargeRecordView;


/**
 * 充值记录
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:42
 */
public interface RechargeRecordDao extends BaseMapper<RechargeRecordEntity> {
	
	List<RechargeRecordView> selectListView(@Param("ew") Wrapper<RechargeRecordEntity> wrapper);

	List<RechargeRecordView> selectListView(Pagination page,@Param("ew") Wrapper<RechargeRecordEntity> wrapper);
	
	RechargeRecordView selectView(@Param("ew") Wrapper<RechargeRecordEntity> wrapper);


}
